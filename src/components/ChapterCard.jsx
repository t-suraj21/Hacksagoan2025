// src/components/ChapterCard.jsx
const ChapterCard = ({ classId, subject, chapterId, onClick }) => {
    return (
      <div
        className="p-4 m-2 border rounded shadow hover:bg-gray-100 cursor-pointer"
        onClick={() => onClick(classId, subject, chapterId)}
      >
        <h2 className="text-lg font-semibold">Class {classId} - {subject} - Chapter {chapterId}</h2>
      </div>
    );
  };
  
  export default ChapterCard;