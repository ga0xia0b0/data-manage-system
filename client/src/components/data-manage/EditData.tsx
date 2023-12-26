import { useForm, Controller } from 'react-hook-form';
import { Form ,Input ,Button, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import dayjs from 'dayjs';

type TagItem = {
    key: string;
    tag: string;
}

type DataItem = {
    key: string;
    id: string;
    name: string;
    description: string;
    time: dayjs.Dayjs;
    tags: string[];
}

type StringDataItem = {
    key: string;
    id: string;
    name: string;
    description: string;
    time: string|dayjs.Dayjs;
    tags: string[];
}

type EditDataProps = {
    tags: TagItem[];
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
    showEditForm: boolean;
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
    record: DataItem;
}

interface FormValues {
    name: string;
    description: string;
    tags: string[];
}

function EditData ({ tags, setData, showEditForm, setShowEditForm, record }:EditDataProps) {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();

    const onSubmit = (newData:FormValues) => {
        let formatData = {
            key: record.key,
            id: record.id,
            name: newData.name,
            description: newData.description,
            time: record.time.format('YYYY-MM-DD'),
            tags: newData.tags || []
        }
        axios
            .put(`/api/data/${record.key}`, formatData)
            .then((res)=>{
                res.data.forEach((item:StringDataItem)=>{
                    item.time = dayjs(item.time);
                })
                setData(res.data);
            })
        setShowEditForm(false);
    }

    // 将标签数据转为Select组件的options格式
    const tagOptions = tags.map((item)=>({label:item.tag, value:item.tag}));

    useEffect(()=>{
        setValue('name', record.name);
        setValue('description', record.description);
        setValue('tags', record.tags);
    },[record, setValue])          //根据选择编辑的数据，设置表单的默认值

    return (
        showEditForm &&
        <div className='addform'>
            <Form onFinish={handleSubmit(onSubmit)}>
                <h2>{t('编辑数据')}</h2>
                <Form.Item label={t('名称')}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field}/>}
                    />
                    {errors.name && <span>{t('名称不能为空')}</span>}
                </Form.Item>

                <Form.Item label={t('描述')}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <Input.TextArea {...field}/>}
                    />
                </Form.Item>

                <Form.Item label={t('标签')}>
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => 
                        <Select
                            {...field}
                            mode="multiple"
                            allowClear
                            placeholder={t('请选择标签')}
                            options={tagOptions}
                        />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('提交')}
                    </Button>
                    <Button style={{marginLeft:'15px'}} onClick={()=>setShowEditForm(false)}>
                        {t('取消')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditData;