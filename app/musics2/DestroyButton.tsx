'use client';

import deleteMusic from "./_actions/deleteMusic";

export default function DestroyButton({
  id,
  onDelete,
}: {
  id: number;
  onDelete?: () => void; 
}) {
  const handleDelete = async () => {
    try {
      console.log('Delete id:', id);
      await deleteMusic(id);
      alert('Music deleted!');

      // ✅ Update UI
      if (onDelete) onDelete();
    } catch (error) {
      console.error('Error deleting music:', error);
      alert('Error deleting music');
    }
  };

  return (
    <button
      className="px-4 py-1 bg-red-400 text-red-900 rounded  hover:bg-red-500 hover:text-white"
      onClick={handleDelete}
    >
      Destroy
    </button>
  );
}