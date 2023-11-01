import Step, { CommonStepProps } from "../../common/Step";

  
  const Review: React.FC<CommonStepProps> = ({ onNext, formData }) => {
    return (
      <Step onNext={onNext}>
            <h2 className="text-xl text-primary mb-3">Book Title: {formData?.title}</h2>
            <h3 className="text-lg text-primary mb-3">Author: {formData?.author}</h3>
            <h3 className="text-lg text-primary mb-3">Chapters:</h3>
            <ul>
              {formData && formData.chapters && formData.chapters.map((chapter, index) => (
                <li key={index} className="mb-2">
                  <strong>{chapter.chapterTitle}</strong> - {chapter.chapterContent.substring(0, 50)}...
                </li>
              ))}
            </ul>
      </Step>
    );
  };
  
  export default Review;