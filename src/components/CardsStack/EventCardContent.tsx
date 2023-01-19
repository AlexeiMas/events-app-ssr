import React from 'react';
import {CardContent, CardMedia, Typography} from "@mui/material";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import {TEventCard} from "../../../types/dataTypes";

const EventCardContent = (
  {
    data,
    imgWidth,
    titleCardVariant
  }: Required<Pick<TEventCard, "data" | "imgWidth" | "titleCardVariant">>
) => {
  return (
    <>
      <CardMedia>
        <Image
          src={data.image}
          alt={data.title}
          width={imgWidth}
          height={imgWidth - 100}
          className={styles.image}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom sx={{typography: {xs: 'h5', sm: 'h4'}}} variant={titleCardVariant}>
          {data.title}
        </Typography>
        <Typography
          variant="body2" color="text.secondary" gutterBottom
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {data.description}
        </Typography>
      </CardContent>
    </>
  );
};

export default EventCardContent;