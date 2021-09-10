import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles(() => ({
  cardContainer: {
    backgroundColor: "lightgray",
    display: "flex",
    paddingTop: "25px",
    paddingLeft: "25px",
    paddingRight: "50px",
    flexDirection: "row"
  },

  whosThatPokemon: {
    marginTop: "15px",
    height: "150px",
    padding: "5px"
  },

  pokemonImage: {
    paddingLeft: "50px",
    marginBottom: "20px",

  },

  button: {
    backgroundColor: "firebrick"
  },

  pokemonInfo: {
    border: "solid 7px",
    borderBlockStyle: "groove",
    borderRadius: "5px",
    marginLeft: "80px",
    height: "170px",
    padding: "50px",
    backgroundColor: "honeydew"
  }
}));
const Pokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    const { front_default } = sprites;
    return (
      <div className={classes.cardContainer}>
        <Typography variant="h3" className={classes.whosThatPokemon}>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} alt="" />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} className={classes.pokemonImage} src={fullImageUrl} alt="" />
        <div className={classes.pokemonInfo}>
          <Typography variant="h5">Stats:</Typography>
          <Typography>
            {"Species: "}
            <Link href={species.url}>{toFirstCharUppercase(species.name)} </Link>
          </Typography>
          <Typography>Height: {height} </Typography>
          <Typography>Weight: {weight} </Typography>
          <Typography variant="h6"> Types:</Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return <Typography key={name}> {`${toFirstCharUppercase(name)}`}</Typography>;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")} className={classes.button}>
          back to pokedex
        </Button>
      )}
    </>
  );
}

export default Pokemon;