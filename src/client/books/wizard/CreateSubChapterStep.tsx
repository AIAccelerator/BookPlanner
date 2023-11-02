import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Transition } from '@headlessui/react';

interface SubChapter {
  id: number;
  title: string;
  description: string;
}

const CreateSubChapterStep: React.FC = () => {
    const { register, errors, unregister, getValues, setValue, trigger } = useFormContext();
    const chapters = getValues("chapters") || [{ title: '', description: '', subChapters: [{ title: '', description: '' }] }];
  
    const handleAddSubChapter = (chapterIndex: number) => {
        const updatedChapters = [...chapters];
        updatedChapters[chapterIndex].subChapters = [...updatedChapters[chapterIndex].subChapters, { title: '', description: '' }];
        setValue("chapters", updatedChapters);
        trigger(`chapters[${chapterIndex}].subChapters`);
    };
  
    const handleRemoveSubChapter = (chapterIndex: number, subChapterIndex: number) => {
        const updatedChapters = [...chapters];
        updatedChapters[chapterIndex].subChapters = updatedChapters[chapterIndex].subChapters.filter((_, idx) => idx !== subChapterIndex);
        setValue("chapters", updatedChapters);
        trigger(`chapters[${chapterIndex}].subChapters`);
    
        unregister(`chapters[${chapterIndex}].subChapters[${subChapterIndex}].title`);
        unregister(`chapters[${chapterIndex}].subChapters[${subChapterIndex}].description`);
    };

    useEffect(() => {
        const initialChapters = chapters.map(chap => ({ ...chap, subChapters: chap.subChapters || [{ title: '', description: '' }] }));
        setValue("chapters", initialChapters);
    }, [setValue, chapters]);

    return (
        <>
            <h2 className="text-primary mb-4">Add SubChapters</h2>
            {chapters && chapters.map((chapter, chapterIndex) => (
              chapter.subChapters && 
                <React.Fragment key={chapterIndex}>
                    <div>
                        <h3 className="text-primary mb-4">Chapter {chapterIndex + 1}: {chapter.title}</h3>
                        {chapter.subChapters.map((_, index) => (
                            <Transition
                                key={index}
                                as={React.Fragment}
                                show={true}
                                enter="transform transition-all ease-out duration-1000"
                                enterFrom="opacity-0 scale-90"
                                enterTo="opacity-100 scale-100"
                                leave="transform transition-all ease-in duration-1000"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-90"
                            >
                                <div className="mb-6">
                                    <input
                                        {...register(`chapters[${chapterIndex}].subChapters[${index}].title`, { required: "Title is required" })}
                                        placeholder="Title"
                                        className="border border-primary p-2 mb-2 w-full"
                                        defaultValue={getValues(`chapters[${chapterIndex}].subChapters[${index}].title`)}
                                    />
                                    {errors?.chapters?.[chapterIndex]?.subChapters?.[index]?.title && (
                                        <div className="text-accent">{errors.chapters[chapterIndex].subChapters[index].title.message}</div>
                                    )}
                                    <textarea
                                        {...register(`chapters[${chapterIndex}].subChapters[${index}].description`, { required: "Description is required" })}
                                        placeholder="Description"
                                        className="border border-primary p-2 mb-2 w-full"
                                        defaultValue={getValues(`chapters[${chapterIndex}].subChapters[${index}].description`)}
                                    />
                                    {errors?.chapters?.[chapterIndex]?.subChapters?.[index]?.description && (
                                        <div className="text-accent">{errors.chapters[chapterIndex].subChapters[index].description.message}</div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubChapter(chapterIndex, index)}
                                        className="bg-secondary text-background py-1 px-2 border border-primary rounded-md"
                                    >
                                        -
                                    </button>
                                </div>
                            </Transition>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddSubChapter(chapterIndex)}
                            className="bg-primary text-background py-1 px-2 border border-primary rounded-md mb-4"
                        >
                            + Add SubChapter
                        </button>
                    </div>
                </React.Fragment>
            ))}
        </>
    );
};

export default CreateSubChapterStep;
