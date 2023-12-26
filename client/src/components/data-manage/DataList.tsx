import { Button, ConfigProvider, Tag, Table, Space } from "antd";
import type { ColumnsType } from 'antd/es/table';
import React, { useState ,useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import dayjs from "dayjs";

// 定义数据项的类型
interface DataItem {
  key: string;
  id: string;
  name: string;
  description: string;
  time: dayjs.Dayjs; // 假设 time 是 dayjs.Dayjs 类型
  tags: string[];
}

// 定义组件 props 的类型
interface DataListProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  InputValue: {
    name: string;
    tags: string[];
    time: dayjs.Dayjs | null | undefined;
  };
  showAddForm: boolean;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  showEditForm: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setRecord: React.Dispatch<React.SetStateAction<DataItem>>;
}

function contain(a: string[], b: string[]): boolean {       //判断数组a是否包含数组b
  if (a.length < b.length) {
    return false;
  }
  for (let i = 0; i < b.length; i++) {
    if (!a.includes(b[i])) {
      return false;
    }
  }
  return true;
}

function DataList ({ data, setData, InputValue, showAddForm, setShowAddForm, showEditForm, setShowEditForm, setRecord}:DataListProps) {
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = useState(data);

  const columns:ColumnsType<DataItem> = [
    {
      title: t('编号'),
      dataIndex: 'id',
      key: 'id',
      render: (text:string) => <a style={{color:'black'}}>{text}</a>,
    },
    {
      title: t('名称'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('描述'),
      dataIndex: 'description',
      key: 'description',
    },
    {
        title: t('添加时间'),
        dataIndex: 'time',
        key: 'time',
        render: (text:dayjs.Dayjs) => <>{text.format('YYYY-MM-DD')}</>,
    },
    {
      title: t('标签'),
      key: 'tags',
      dataIndex: 'tags',
      render: (_:unknown, { tags }:{tags:string[]}) => (
        <>
          {tags.map((tag:string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'developer') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t('操作'),
      key: 'action',
      align: 'center',
      render: (_:unknown, record:DataItem) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>{t('编辑')}</a>
          <a style={{color:'black'}} onClick={() => handleDelete(record)}>{t('删除')}</a>
        </Space>
      ),
    },
  ];
  
  const handleEdit = (record:DataItem)=>{
    setRecord(record);
    setShowEditForm(!showEditForm);
  }
  
  const handleDelete = (record:DataItem)=>{
    axios.delete(`/api/data/${record.id}`)
    setData(data.filter((item) => item.id !== record.id).map((item) => {
      item.id = String(item.id > record.id ? Number(item.id) - 1 : item.id);
      return item;
    }));
  }

  useEffect(()=>{
    const newFilteredData = data.filter((item)=>
      (InputValue.name?item.name===InputValue.name:true) &&
      (InputValue.tags?contain(item.tags, InputValue.tags):true) &&
      (InputValue.time?item.time.isSame(InputValue.time, 'D'):true)
    );
    setFilteredData(newFilteredData);
  },[InputValue,data])

  return (
    <div className="list-wrapper">
        <ConfigProvider autoInsertSpaceInButton={false}>
            <Button 
              type="primary"
              size="large" 
              style={{marginBottom:'6px',float:'right'}}
              onClick={()=>setShowAddForm(!showAddForm)}
            >
              {t('添加')}
            </Button>
        </ConfigProvider>
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          bordered={true}
          pagination={{ pageSize: 6 }}  // 设置每页显示6条数据
        />
    </div>
  )
}

export default DataList;