'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function FetchAPI() {

    const init = {
        "login": "nattawas022",
        "id": 199181812,
        "node_id": "U_kgDOC99F9A",
        "avatar_url": "https://avatars.githubusercontent.com/u/199181812?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/nattawas022",
        "html_url": "https://github.com/nattawas022",
        "followers_url": "https://api.github.com/users/nattawas022/followers",
        "following_url": "https://api.github.com/users/nattawas022/following{/other_user}",
        "gists_url": "https://api.github.com/users/nattawas022/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/nattawas022/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/nattawas022/subscriptions",
        "organizations_url": "https://api.github.com/users/nattawas022/orgs",
        "repos_url": "https://api.github.com/users/nattawas022/repos",
        "events_url": "https://api.github.com/users/nattawas022/events{/privacy}",
        "received_events_url": "https://api.github.com/users/nattawas022/received_events",
        "type": "User",
        "user_view_type": "public",
        "site_admin": false,
        "name": null,
        "company": null,
        "blog": "",
        "location": null,
        "email": null,
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 3,
        "public_gists": 0,
        "followers": 0,
        "following": 0,
        "created_at": "2025-02-14T02:49:07Z",
        "updated_at": "2025-04-03T03:15:34Z"
        }

    const [name, setName] = useState('nattawas022')
    const [profile, setProfile] = useState(init)


    const fetchAPI = async () => {
        const data = await fetch(`https://api.github.com/users/${name}`)
        const profile = await data.json()
        setProfile(profile)
    }

    return (
        <div>
            <h2>Fetch API</h2>
            <div>{
                JSON.stringify(profile)}</div>
            <hr /><br />
            <div className='flex items-center gap-4 m-4 border border-gray-300 p-4 rounded-lg'>
                <div>
                    <Image
                        className="rounded-full"
                        src={profile.avatar_url}
                        alt="Avatar"
                        width={100}
                        height={100}
                    />
                </div>
                <div>
                    <div>
                        Login: {profile.login}
                    </div>
                    <div>
                        id: {profile.id}
                    </div>
                    <div>
                        <input
                            className='border border-gray-300 rounded mt-2 mr-2'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            onClick={fetchAPI}
                            className='border px-2'
                        >Update</button>
                    </div>
                </div>



            </div>
        </div>)
}