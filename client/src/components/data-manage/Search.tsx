import { Input, Space, Select, DatePicker, Button } from "antd";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchProps {
    tagOptions: Array<{key:string,tag:string}>;
    InputValue: {
        name: string;
        tags: string[];
        time: Dayjs | null | undefined;
    };
    setInputValue: React.Dispatch<React.SetStateAction<{
        name: string;
        tags: string[];
        time: Dayjs | null | undefined;
    }>>;
}

const Search: React.FC<SearchProps> = ({ tagOptions, InputValue, setInputValue }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(InputValue.name);
    const [tags, setTags] = useState(InputValue.tags);
    const [time, setTime] = useState(InputValue.time);

    const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; })=>{
        setName(e.target.value);
    }
    const handleTagsChange = (e: React.SetStateAction<string[]>)=>{
        setTags(e);
    }
    const handleDateChange = (e: React.SetStateAction<Dayjs | null | undefined>)=>{
        if(e){
            setTime(e);
        } else{
            setTime(null);
        }
    }

    const options = tagOptions.map((item)=>({label:item.tag, value:item.tag}));

    return (
        <div className="search">
            <span>
                <label htmlFor="name">{t('名称：')}</label>
                <Space.Compact>
                    <Input onChange={handleNameChange} placeholder={t("请输入搜索名称")} value={name}/>
                </Space.Compact>
            </span>
            <span>
                <label>{t('标签：')}</label>
                <Space>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        minWidth: '250px',
                      }}
                      placeholder={t('请选择标签')}
                      defaultValue={[]}
                      options={options}
                      onChange={handleTagsChange}
                      value={tags}
                    />
                </Space>
            </span>
            <span>
                <label>{t('添加时间：')}</label>
                <Space direction="vertical">
                    <DatePicker onChange={handleDateChange} placeholder="" value={time}/>
                </Space>
            </span>
            <span>
                <Button type="primary" onClick={()=>setInputValue({name,tags,time})}>
                    {t('搜索')}
                </Button>
            </span>
            <span>
                <Button onClick={()=>{
                    setInputValue({name:'',tags:[],time:null});
                    setName('');
                    setTags([]);
                    setTime(null);
                }}>
                    {t('重置')}
                </Button>
            </span>
        </div>
    )
}

export default Search;