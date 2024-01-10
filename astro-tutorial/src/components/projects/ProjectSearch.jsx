import {useState} from 'react'
import {TbAdjustmentsHorizontal} from "react-icons/tb"
import FilterMenu from './FilterMenu.jsx';
import ProjectGrid from './ProjectGrid.jsx'

export default function ProjectSearch({uniqueTags, allProjects, allProjectTags}){
    const [selectedTags, setSelectedTags] = useState([])
    const [filterMenuVisible, setFilterMenuVisible] = useState(window.innerWidth >= 768);

    function handleTagSelection(tag){
        setSelectedTags(prevTags => {
            const lowerCaseTag = tag.toLowerCase()
            // Check if the tag is already in the array
            const tagIndex = prevTags.indexOf(lowerCaseTag);
    
            // If the tag is not in the array, add it
            if (tagIndex === -1) {
                return [...prevTags, lowerCaseTag];
            } else {
                // If the tag is already in the array, remove it
                const newTags = [...prevTags];
                newTags.splice(tagIndex, 1);
                return newTags;
            }
        });
    }

    function handleReset(){
        setSelectedTags([])
    }

    function toggleFilterMenu() {
        setFilterMenuVisible((prevVisible) => !prevVisible);
    }

    return (
        <section className='md:grid grid-cols-3 gap-4'>
            <div className='flex py-6'>
                <button
                    className='md:hidden btn-tertiary flex gap-2'
                    onClick={toggleFilterMenu}
                >
                    <p>Filters</p><TbAdjustmentsHorizontal class="w-5 h-5 inline-block"/> 
                </button>
            </div>
            <FilterMenu 
                    key="FilterMenu"
                    filterMenuVisible={filterMenuVisible}
                    toggleFilterMenu={toggleFilterMenu}
                    uniqueTags={uniqueTags} 
                    selectedTags={selectedTags} 
                    handleTagSelection={handleTagSelection}
                    handleReset={handleReset}
                />
                <ProjectGrid
                    key="ProjectGrid"
                    selectedTags={selectedTags} 
                    allProjects={allProjects}
                    allProjectTags={allProjectTags}
                />
            
        </section>
      );
}