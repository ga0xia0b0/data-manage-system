import React from "react";
import { Table ,Space, Button, ConfigProvider } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Dayjs } from "dayjs";

type TagListProps = {
    tagData: Array<{key:string,tag:string}>,
    setTagData: React.Dispatch<React.SetStateAction<{key:string,tag:string}[]>>
    showAddTag: boolean,
    setShowAddTag: React.Dispatch<React.SetStateAction<boolean>>,
    showEditTag: boolean,
    setShowEditTag: React.Dispatch<React.SetStateAction<boolean>>,
    setRecord: React.Dispatch<React.SetStateAction<{key:string,tag:string}>>
}

type TagItem = {
    key: string;
    tag: string;
}

interface DataItem {
    key: string;
    id: string;
    name: string;
    description: string;
    time: Dayjs; // 假设 time 是 dayjs.Dayjs 类型
    tags: string[];
}

function TagList ({ tagData, setTagData, showAddTag, setShowAddTag, showEditTag, setShowEditTag, setRecord }:TagListProps) {
    const { t } = useTranslation();

    const columns:ColumnsType<TagItem> = [
        {
            title: t('标签'),
            dataIndex: 'tag',
            key: 'tag',
            render: (text:string) => <a style={{color:'black'}}>{text}</a>,
        },
        {
            title: t('操作'),
            key: 'action',
            align: 'center',
            render: (_:unknown, record:TagItem) => (
            <Space size="middle">
                <a onClick={()=>handleEdit(record)}>{t('编辑')}</a>
                <a onClick={()=>handleDelete(record)} style={{color:'red'}}>{t('删除')}</a>
            </Space>
            ),
        },
    ];

    const handleEdit = (record:TagItem) => {
        console.log('try-edit:', record);
        let used = false;
        axios
            .get('/api/data')
            .then((res)=>{
                res.data.forEach((item:DataItem)=>{ 
                    if (item.tags.includes(record.tag)){
                        used = true;
                    }
                })
            })
            .then(()=>{
                if (!used){
                    setRecord(record);
                    setShowEditTag(!showEditTag);
                    console.log('edit:', record);
                } else {
                    alert(t('该标签已被使用，无法编辑'));
                }
            })
    }

    const handleDelete = (record:TagItem) => {
        console.log('try-delete:', record);
        let used = false;
        axios
            .get('/api/data')
            .then((res)=>{
                res.data.forEach((item:DataItem)=>{
                    if (item.tags.includes(record.tag)){
                        used = true;
                    }
                })
            })
            .then(()=>{
                if (!used){
                    axios.delete(`/api/tag/${record.key}`)
                        .then((res)=>{
                            setTagData(res.data);
                        })
                    console.log('delete:', record)
                } else {
                    alert(t('该标签已被使用，无法删除'));
                }
            })
    }

    return (
        <>
            <ConfigProvider autoInsertSpaceInButton={false}>
                <Button
                    type="primary"
                    style={{margin:'0 10% 15px 0',float:'right'}}
                    onClick={()=>setShowAddTag(!showAddTag)}
                >
                    {t('添加')}
                </Button>
            </ConfigProvider>
            <Table
                columns={columns}
                dataSource={tagData}
                style={{width:'80%', margin:'0 10%'}}
                pagination={{pageSize:10}}
            />
        </>
    )
}

export default TagList;