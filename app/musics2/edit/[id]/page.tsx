'use client'

import {  useParams } from "next/navigation"
import { useEffect, useState } from "react" 
import MusicType from '../../music.type'
import EditForm from "./EditForm"

export default function EditMusic() {
    const { id } = useParams()
    const [musicData, setMusicData] = useState<MusicType | null>(null)

    useEffect(() => {
        const fetchMusic = async (id: string) => {
            const res = await fetch(`http://localhost:3000/music/${id}`)
            const data = await res.json()
            setMusicData(data)
        }

        if (typeof id === 'string') {
            fetchMusic(id)
        }
    }, [id])

    if (!musicData) return <div>Loading...</div>

    // Pass fetched data to the form
    return <EditForm music={musicData} />
}