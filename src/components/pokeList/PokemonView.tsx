interface PokeProps {
    name: string
    types: string[]
    moves: string[]
    image: string
    height: number
    weight: number
}

export const PokemonView = ({
    name,
    types,
    moves,
    image,
    height,
    weight,
}: PokeProps) => {
    
    return (
        <>
            <div>
                {name}
            </div>
            <div>
                <img src={image} alt=''/>
            </div>
            <div>
                {types.join(', ')}
            </div>
            <div>
                {moves.slice(0, 4).join(', ')}
            </div>
            <div>
                Height: {height} Weight: {weight}
            </div>
        </>
    )
}