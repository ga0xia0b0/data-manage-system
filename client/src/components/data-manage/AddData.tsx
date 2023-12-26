import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form ,Input ,Button, Select } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

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

type AddDataProps = {
    tags: TagItem[];
    data: DataItem[];
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
    showAddForm: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
    name: string;
    description: string;
    tags: string[];
}

function AddData ({ tags, data, setData, showAddForm, setShowAddForm}:AddDataProps) {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (newData: FormValues) => {
        let formatData = {
            key: String(data.length+1),
            id: String(data.length+1),
            name: newData.name,
            description: newData.description||'',
            time: dayjs().format('YYYY-MM-DD'),
            tags: newData.tags
        }
        axios
            .post('/api/data', formatData)
            .then((res)=>{
                res.data.forEach((item:DataItem)=>{
                    item.time = dayjs(item.time);
                })
                setData(res.data);
            })
        setShowAddForm(false);
    }

    // 将标签数据转为Select组件的options格式
    const tagOptions = tags.map((item)=>({label:item.tag, value:item.tag}));

    return (
        showAddForm &&
        <div className='addform'>
            <Form onFinish={handleSubmit(onSubmit)}>
                <h2>{t('添加数据')}</h2>
                <Form.Item label={t('名称')}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.name && <span>{t('名称不能为空')}</span>}
                </Form.Item>

                <Form.Item label={t('描述')}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <Input.TextArea {...field} />}
                    />
                </Form.Item>

                <Form.Item label={t('标签')}>
                    <Controller
                        name="tags"
                        control={control}
                        defaultValue={[]}
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
                    <Button style={{marginLeft:'15px'}} onClick={()=>setShowAddForm(false)}>
                        {t('取消')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddData;