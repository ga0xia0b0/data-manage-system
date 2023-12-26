import TagList from "./TagList"
import React, { useState } from "react";
import AddTag from "./AddTag";
import EditTag from "./EditTag";

type TagManageProps = {
    tags: Array<{key:string,tag:string}>,
    setTags: React.Dispatch<React.SetStateAction<{key:string,tag:string}[]>>
}

function TagManage ({tags, setTags}:TagManageProps) {
    const [showAddTag, setShowAddTag] = useState(false);
    const [showEditTag, setShowEditTag] = useState(false);
    const [record, setRecord] = useState({key:'',tag:''});

    return (
        <div className="content">
            <TagList
                tagData={tags}
                setTagData={setTags}
                showAddTag={showAddTag}
                setShowAddTag={setShowAddTag}
                showEditTag={showEditTag}
                setShowEditTag={setShowEditTag}
                setRecord={setRecord}
            />
            <AddTag 
                tagData={tags}
                setTagData={setTags}
                showAddTag={showAddTag}
                setShowAddTag={setShowAddTag}
            />
            <EditTag 
                setTagData={setTags}
                showEditTag={showEditTag}
                setShowEditTag={setShowEditTag}
                record={record}
            />
        </div>
    )
}

export default TagManage;