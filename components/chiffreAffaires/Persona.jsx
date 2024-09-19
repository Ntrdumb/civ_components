import { useState } from 'react';
import { XIcon, ChevronRightIcon } from 'lucide-react';

export default function Persona() {
    // Template for now to set and get the tags
    const [tags, setTags] = useState(['25-40 ans', 'Montréal', '+20 000$']);

    // Removes a tag
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    function getEverything() {
        console.log("Mon persona: " + tags);
    }

    return (
        <div>
            {/* <button className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 fixed right-0"
                    onClick={getEverything}>
                Get it
            </button> */}

            <div className="flex items-end space-x-2">
            <textarea 
                className="flex-grow bg-white border border-gray-300 rounded p-2 text-sm placeholder:italic resize-none"
                rows={3}
                defaultValue="Je cible les femmes entre 25 et 40 ans, qui habitent à Montréal avec un revenu dépassant les 20 000$ par année."
            />
            <button className="rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 p-2">
                <ChevronRightIcon size={20} />
            </button>
            </div>
                
            <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center">
                {tag}
                
                {/* x button to remove it's tag */}
                <button 
                    onClick={() => removeTag(tag)} 
                    className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <XIcon size={12} />
                </button>
                </span>
            ))}
            </div>
            
        </div>
    )
}
