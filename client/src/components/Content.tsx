import { Route, Routes } from 'react-router-dom';
import DataManage from './data-manage/DataManage';
import TagManage from './tag-manage/TagManage';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

interface DataItem {
  key: string;
  id: string;
  name: string;
  description: string;
  time: dayjs.Dayjs;
  tags: string[];
}

interface TagItem {
  key: string;
  tag: string;
}

function Content () {
    const [tags, setTags] = useState<TagItem[]>([]);
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(()=>{
      axios.get('/api/tag')
      .then(res=>{
        setTags(res.data);
      })
    },[])

    useEffect(()=>{
      axios.get('/api/data')
      .then(res=>{
        res.data.forEach((item: DataItem)=>{
          item.time = dayjs(item.time);
        })
        setData(res.data);
      })
    },[])

    return (
        <Routes>
            <Route path='/' element={<DataManage tags={tags} data={data} setData={setData}/>} />
            <Route path='/index.html' element={<DataManage tags={tags} data={data} setData={setData}/>} />
            <Route path='/data-manage' element={<DataManage tags={tags} data={data} setData={setData}/>} />
            <Route path='/tag-manage' element={<TagManage tags={tags} setTags={setTags}/>} />
        </Routes>
    )
}

export default Content;