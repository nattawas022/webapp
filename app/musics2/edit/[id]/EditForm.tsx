'use client'

import { redirect } from "next/navigation"
import { useActionState } from "react"
import updateMusic from "../../_actions/updateMusic"
import MusicType from "../../music.type"

export default function EditForm({ music }: { music: MusicType }) {
    const [state, action] = useActionState(updateMusic, {
        error: '',
        message: '',
        data: {
            id: music.id || '',
            music_name: music.music_name || '',            
            price: music.price || '',
            is_new: music.is_new || false,
            brand: music.brand || '',
        },
    })

    if (state.message) {
        redirect('/musics')
    }

    const { id, music_name, price, is_new, brand } = state.data

    return (
        <>
            <div>{JSON.stringify(music)}</div>
            <form
                className="max-w-md border mx-auto p-6 mt-8 space-y-4"
                action={action}
            >
                <h1 className="text-xl font-bold">Edit Music Taste</h1>
                {state.error && (
                    <div className="text-red-500">Error: {state.error}</div>
                )}
                <div>
                    <input type="hidden" name="id" value={id} />
                    <input
                        className="border-2 p-2 rounded w-full"
                        type="number"
                        name="name"
                        placeholder="Name"
                        defaultValue={id}
                    />
                </div>
                
                <div>
                    <label htmlFor="music_name">Music Name: </label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="music_name"
                        defaultValue={music_name}
                        placeholder="Music_name" />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input
                        className="border p-2 rounded w-full"
                        type="number"
                        name="price"
                        defaultValue={price}
                        placeholder="Price" />
                </div>

                <div>
                    <input type="checkbox" name="is_new" defaultChecked={is_new} />
                    <label className="ml-2">Is new?</label>
                </div>

                <div>
                    <label htmlFor="brand">Brand: </label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="brand"
                        defaultValue={brand}
                        placeholder="Brand" />
                </div>
                <div>
                    <button
                        className="border px-4 py-2 rounded bg-blue-400"
                        type="submit">Update
                    </button>
                </div>
            </form>
        </>
    )
}