"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MusicType from "./music.type";
import DestroyButton from "./DestroyButton";

export default function MusicPage() {
  const [musics, setMusics] = useState<MusicType[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const fetchMusics = async () => {
      try {
        const res = await fetch("http://localhost:3000/music");
        const data = await res.json();
        setMusics(data);
      } catch (err) {
        console.error("Failed to fetch musics", err);
      }
    };

    fetchMusics();
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-300 py-10 px-4 text-white">
      <h1 className="text-2xl font-extrabold mb-6 text-center drop-shadow">
        Music List
      </h1>

      {musics.length === 0 ? (
        <div className="text-center text-white animate-pulse">
          Loading Music...
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {musics.map((music, index) => (
            <div
              key={music.id}
              className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-[1.01] transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">
                  {music.id}. {music.music_name}
                </h2>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    music.is_new
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {music.is_new ? "New Release" : "Classic"}
                </span>
              </div>
              <p className="text-sm mb-1">
                <span className="font-semibold">Price:</span> ${music.price}
              </p>
              <p className="text-sm mb-3">
                <span className="font-semibold">Brand:</span> {music.brand}
              </p>

              <div className="flex justify-end gap-2">
                <Link
                  className="px-4 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
                  href={`/musics/edit/${music.id}`}
                >
                  Edit
                </Link>
                <DestroyButton
                  id={music.id}
                  onDelete={() => {
                    setMusics((prev) => prev.filter((m) => m.id !== music.id));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link
          href="/musics/new"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add New Music
        </Link>
      </div>
    </div>
  );
}