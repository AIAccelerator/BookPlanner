import React from 'react';
import ResourceFilters from './ResourceFilters';
import { ResourceCreateButton } from './ResourceCreateButton';
import ResourceType from '../../common/types/ResourceType';

type ResourceHeadProps = {
    totalResources: number;
    searchTerm: string;
    tag: string;
    clearSearch: () => void;
    clearTag: () => void;
    handleOpenFilterModal: () => void;
    handleSelectResourceType: (type: ResourceType) => void;
};
export const ResoruceHead: React.FC<ResourceHeadProps> = ({totalResources, searchTerm, tag, clearSearch, clearTag, handleOpenFilterModal, handleSelectResourceType}) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Resource Library</h1>
            </div>

            <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Total Resources: {totalResources}</span>
            <div className="flex items-center">
                <ResourceFilters
                searchTerm={searchTerm}
                tag={tag}
                clearSearch={clearSearch}
                clearTag={clearTag}
                handleOpenFilterModal={handleOpenFilterModal}
                />        
                <ResourceCreateButton handleSelectResourceType={handleSelectResourceType} />
            </div>
            </div>
        </>
    );
};