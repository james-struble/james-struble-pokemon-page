import { useState, useEffect} from "react";
import { PokemonView } from "./PokemonView";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

interface PokemonFromAPI {
    name: string
    types: {
        type: {
            name: string
        }
    }[]
    moves: {
        move: {
            name: string
        }
    }[]
    sprites: {
        front_default: string
    }
    height: number
    weight: number

}

interface Pokemon {
    name: string
    types: string[]
    moves: string[]
    image: string
    height: number
    weight: number
}

export const PokemonController = () => {
    const [ pokemon, setPokemon ] = useState<Pokemon>()
    const [userQuery, setUserQuery] = useState("")

    const fetchPokemon = async (pokemonId: string) => {
        try{
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const { data } = result
            const pokemonFromApi: PokemonFromAPI = data

            const createdPokemon: Pokemon = {
                name: pokemonFromApi.name,
                types: pokemonFromApi.types.map(typeObj => typeObj.type.name),
                moves: pokemonFromApi.moves.map(moveObj => moveObj.move.name),
                image: pokemonFromApi.sprites.front_default,
                height: pokemonFromApi.height,
                weight: pokemonFromApi.weight
            }

            console.log(createdPokemon)

            setPokemon(createdPokemon)
        } catch (e) {
            console.log(e)
            setPokemon(undefined)
        }
    }

    useEffect(() => {
        fetchPokemon('1')
    }, [])

    return (
        <div>
            <Stack className="App">
                <TextField
                    style={{paddingBottom: "20px"}}
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={userQuery}
                    onChange={(event) => setUserQuery(event.target.value)}
                    />

                <Button variant="outlined" startIcon={<SearchIcon />} onClick={() => {fetchPokemon(userQuery);}}>
                    Search
                </Button>
            <PokemonController/>
            {
                pokemon ? <PokemonView {...pokemon}/> : 'Not Found'
            }
            </Stack>
        </div>
    )
}