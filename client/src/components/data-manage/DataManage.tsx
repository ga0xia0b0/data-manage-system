import React, { useState } from 'react';
import Search from './Search';
import DataList from './DataList';
import AddData from './AddData';
import EditData from './EditData';
import dayjs, { Dayjs } from 'dayjs';

type DataManageProps = {
    tags: Array<{key:string,tag:string}>,
    data: Array<DataItem>,
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>
}

type InputValueType = {
    name: string;
    tags: string[];
    time: Dayjs | null | undefined;
}

interface DataItem {
    key: string;
    id: string;
    name: string;
    description: string;
    time: Dayjs;
    tags: string[];
}

function DataManage ({ tags, data, setData }: DataManageProps) {
    const [InputValue, setInputValue] = useState<InputValueType>({name:'',tags:[],time:null});
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [record, setRecord] = useState<DataItem>({
        key: '',
        id: '',
        name: '',
        description: '',
        time: dayjs(),
        tags: []
    });

    return (
        <div className="content">
            <div className='search-bg'>
                <Search tagOptions={tags} InputValue={InputValue} setInputValue={setInputValue}/>
            </div>
            <div className='list-bg'>
                <DataList
                    data={data}
                    setData={setData}
                    InputValue={InputValue}
                    showAddForm={showAddForm}
                    setShowAddForm={setShowAddForm}
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                    setRecord={setRecord}
                />
                <AddData
                    tags={tags}
                    data={data}
                    setData={setData}
                    showAddForm={showAddForm}
                    setShowAddForm={setShowAddForm}
                />
                <EditData                     
                    tags={tags}
                    setData={setData}
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                    record={record}
                />
            </div>
        </div>
    )
}

export default DataManage;