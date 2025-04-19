"use client";

import { useEffect, useState } from "react";

type TPost = {
  id: number;
  fullname: string;
  isActive: boolean;
};

export default function Customers() {
  const [cus, setCus] = useState<TPost[]>([]);
  const [cussy, setCussy] = useState<TPost[]>([]);
  const [newCustomer, setNewCustomer] = useState<TPost>({
    id: 1,
    fullname: "",
    isActive: false,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Fix for hydration error

    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:3000/customer");
        const data = await res.json();
        setCus(data);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    };

    fetchCustomers();
  }, []);

  if (!hasMounted) {
    return null;
  }

  const addCus = () => {
    if (!newCustomer.fullname.trim()) return;

    setCussy([...cussy, newCustomer]);

    // Reset form
    setNewCustomer({
      id: newCustomer.id + 1,
      fullname: "",
      isActive: false,
    });
  };

  const deleteCus = (id: number) => {
    setCussy(cussy.filter((c) => c.id !== id));
  };

  const updateCus = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: keyof TPost
  ) => {
    const value = field === "isActive" ? e.target.checked : e.target.value;

    setCussy((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, [field]: field === "id" ? Number(value) : value }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-600 py-10 px-4 text-purple-400">
      <h1 className="text-xl font-extrabold mb-6 text-center text-purple-900 drop-shadow">
        Customers List
      </h1>

      {cus.length === 0 ? (
        <div className="text-center text-purple-500 animate-pulse">
          Loading Customers...
        </div>
      ) : (
        <ul className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {cus.slice(0, 5).map((cuss) => (
            <li
              key={cuss.id}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:scale-105 transition grid gap-2"
            >
              <p>
                <span className="font-semibold text-purple-700">ID:</span>{" "}
                {cuss.id}
              </p>
              <p>
                <span className="font-semibold text-purple-700">Fullname:</span>{" "}
                {cuss.fullname}
              </p>
              <p>
                <span className="font-semibold text-purple-700">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    cuss.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {cuss.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}

      <ul className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 pb-10 gap-4 ">
        {cussy.map((cuss) => (
          <li
            key={cuss.id}
            className="border border-gray-300 rounded-lg p-4 bg-white grid gap-2"
          >
            <p>
              <span className="font-semibold text-purple-700">ID:</span>{" "}
              {cuss.id}
            </p>

            {editId === cuss.id ? (
              <>
                <input
                  type="text"
                  value={cuss.fullname}
                  onChange={(e) => updateCus(e, cuss.id, "fullname")}
                  className="border rounded px-2 py-1 w-full"
                />
                <label className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    checked={cuss.isActive}
                    onChange={(e) => updateCus(e, cuss.id, "isActive")}
                  />
                  <span className="text-sm">Active?</span>
                </label>
              </>
            ) : (
              <>
                <p>
                  <span className="font-semibold text-purple-700">
                    Fullname:
                  </span>{" "}
                  {cuss.fullname}
                </p>
                <p>
                  <span className="font-semibold text-purple-700">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      cuss.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {cuss.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditId(editId === cuss.id ? null : cuss.id)}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              >
                {editId === cuss.id ? "Done" : "Edit"}
              </button>
              <button
                onClick={() => deleteCus(cuss.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="max-w-3xl mx-auto  mb-10 grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-black">
          <input
            type="number"
            placeholder="ID"
            className="border p-2 rounded w-full"
            value={newCustomer.id}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, id: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Fullname"
            className="border p-2 rounded w-full"
            value={newCustomer.fullname}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, fullname: e.target.value })
            }
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newCustomer.isActive}
              onChange={(e) =>
                setNewCustomer({
                  ...newCustomer,
                  isActive: e.target.checked,
                })
              }
            />
            <span className="text-sm">Active?</span>
          </label>
        </div>
        <div className="text-center">
          <button
            onClick={addCus}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Customer
          </button>
        </div>
      </div>

    </div>
  );
}