import React, {MutableRefObject, useRef, useState} from 'react';
import EventCardWrapper from "../components/CardsStack/EventCardWrapper";
import {IGeneralEvent, TEventData} from "../../types/dataTypes";
import {Alert, AlertTitle, Box, Button, FormControl, IconButton, Stack, TextField} from "@mui/material";
import {useRouter} from "next/router";
import CloseIcon from '@mui/icons-material/Close';

const SingleEventContainer = ({data}: TEventData<IGeneralEvent | undefined>) => {
  const inputEmail = useRef() as MutableRefObject<HTMLInputElement>
  const router = useRouter()
  const [message, setMessage] = useState<{ type: 'error' | 'success', value: string }>({type: 'success', value: ''})


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailValue = inputEmail.current.value
    const eventId = router?.query.id

    const validRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

    if (!emailValue.match(validRegex)) {
      console.log('Error')
      setMessage({type: 'error', value: 'Please introduce a correct email address'})
    } else {
      message.value !== '' && setMessage({type: 'success', value: ''})
    }

    try {
      const response = await fetch('/api/email-registration', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailValue, eventId})
      })

      if (!response.ok) {
        response.json().then(({message}) => setMessage({type: "error", value: message}))
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setMessage({type: 'success', value: data.message})
      inputEmail.current.value = ''

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      {data && <EventCardWrapper data={data} titleCardVariant={"h1"}/>}

      <Stack direction={"row"} mt={5} mb={2} spacing={1} component={"form"} onSubmit={onSubmit}
             justifyContent={{xs: "center", sm: "flex-start"}}>
        <FormControl variant="outlined">
          <TextField
            id="email"
            type={"email"}
            autoComplete={"off"}
            label="Get registered for this event!"
            inputRef={inputEmail}
            onChange={() => message.type === "error" && setMessage({type: "success", value: ""})}
            error={message.type === "error" && message.value.length > 0}
            helperText={message.type === "error" && message.value}
            placeholder={"Insert your email, please..."}
            variant="outlined"
            focused
          />
        </FormControl>
        <Box display={"flex"} height={"3.5rem"}>
          <Button variant="contained" type={"submit"} color={"info"} sx={{fontWeight: "bolder"}}>Submit</Button>
        </Box>
      </Stack>
      {message.type === "success" && message.value &&
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMessage(prevState => ({...prevState, value: ''}));
              }}
            >
              <CloseIcon fontSize="inherit"/>
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          {message.value}
        </Alert>
      }
    </div>
  );
};

export default SingleEventContainer;