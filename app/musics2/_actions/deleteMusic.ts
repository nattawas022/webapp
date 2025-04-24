'use server'
import { revalidatePath } from 'next/cache'  
import { redirect } from 'next/navigation'

const deleteMusic = async (id: number) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE3NDUyODgxMjksImV4cCI6MTc0NTM3NDUyOX0.PNMzG9aaMtwhSxtmQeCzB023MDrhFdBL2qn9630FUts';
    
    console.log("id: ", id)
    const res = await fetch(`http://localhost:3000/music/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const json = await res.json();
    console.log("json: ", json)
    if (res.ok) {
        console.log("Music deleted successfully")
        revalidatePath('/music')  
    } else {
        console.error("Error deleting music:", json); 
        redirect('/music?error=Error deleting music');
    }
}

export default deleteMusic