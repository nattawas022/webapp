'use server'

const addNewMusic = async (prevState: unknown, formData: FormData) => {

    const data = {
        id: formData.get("id") as string,
        music_name: formData.get("music_name") as string,
        price: formData.get("price") as string,
        is_new: formData.get("is_new") === "on",
        brand: formData.get("brand") as string,

    }
    console.log("data: ", data)

    const res = await fetch('http://localhost:3000/music', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const json = await res.json();
    console.log("json: ", json)
    if (res.ok) {
        console.log("Music added successfully");
        return {
            error: '',
            message: 'Music added successfully',
            data,
        }
    } else {
        console.error("Error adding music:", json);
        return {
            error: 'Error adding music',
            message: '',
            data,
        }
    }
}

export default addNewMusic;