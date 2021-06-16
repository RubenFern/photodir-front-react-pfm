import { useState } from "react";

export const useCharacter = (text) => 
{
    const [characters, setcharacters] = useState(text.length);

    const countCharacters = (text) =>
    {
        setcharacters(text.length);
    }

    return [characters, countCharacters];
}
