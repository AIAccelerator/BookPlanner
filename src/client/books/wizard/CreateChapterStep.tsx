import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Transition } from '@headlessui/react';

interface Chapter {
  id: number;
  title: string;
  description: string;
}

const CreateChapterStep: React.FC = () => {
    const { register, errors, unregister, getValues, setValue, trigger } = useFormContext();
  
    const chapters = getValues("chapters") || [{ title: '', description: '' }];
  
    const handleAddChapter = () => {
      setValue("chapters", [...chapters, { title: '', description: '' }]);
      trigger("chapters");
    };
  
    const handleRemoveChapter = (index: number) => {
        const updatedChapters = chapters.filter((_, idx) => idx !== index);
        setValue("chapters", updatedChapters);
        trigger("chapters");
    
        unregister(`chapters[${index}].title`);
        unregister(`chapters[${index}].description`);
    };
  
    useEffect(() => {
      if (!getValues("chapters")) {
        setValue("chapters", [{ title: '', description: '' }]);
      }
    }, [setValue, getValues]);

    return (
        <div>
            <h2 className="text-primary mb-4">Add Chapters</h2>
            {chapters.map((_, index) => (
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
                            {...register(`chapters[${index}].title`, { required: "Title is required" })}
                            placeholder="Title"
                            className="border border-primary p-2 mb-2 w-full"
                            defaultValue={getValues(`chapters[${index}].title`)}
                        />
                        {errors?.chapters?.[index]?.title && (
                            <div className="text-accent">{errors.chapters[index].title.message}</div>
                        )}
                        <textarea
                            {...register(`chapters[${index}].description`, { required: "Description is required" })}
                            placeholder="Description"
                            className="border border-primary p-2 mb-2 w-full"
                            defaultValue={getValues(`chapters[${index}].description`)}
                        />
                        {errors?.chapters?.[index]?.description && (
                            <div className="text-accent">{errors.chapters[index].description.message}</div>
                        )}
                        <button
                            type="button"
                            onClick={() => handleRemoveChapter(index)}
                            className="bg-secondary text-background py-1 px-2 border border-primary rounded-md"
                            disabled={chapters.length <= 1}
                        >
                            -
                        </button>
                    </div>
                </Transition>
            ))}
            <button
                type="button"
                onClick={handleAddChapter}
                className="bg-primary text-background py-1 px-2 border border-primary rounded-md mb-4"
            >
                +
            </button>
        </div>
    );
};

export default CreateChapterStep;
