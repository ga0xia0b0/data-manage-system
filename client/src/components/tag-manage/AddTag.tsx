import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form ,Input ,Button, } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface AddTagProps {
    tagData: Array<{ key: string; tag: string }>;
    setTagData: React.Dispatch<React.SetStateAction<{ key: string; tag: string }[]>>;
    showAddTag: boolean;
    setShowAddTag: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
    tag: string;
}

function AddTag ({ tagData, setTagData, showAddTag, setShowAddTag}: AddTagProps) {
    const { t } = useTranslation();
    const { control, handleSubmit, } = useForm<FormValues>();

    const onSubmit = (newData:FormValues) => {
        let formatData = {
            key: String(tagData.length+1),
            tag: newData.tag
        }
        //如果tagData中已经存在该tag，则不添加
        let tagList = tagData.map((item)=>item.tag);
        if(tagList.includes(newData.tag)){
            alert(t('该标签已存在！'));
        }else{
            axios.post('/api/tag', formatData)
                .then((res)=>{
                    setTagData(res.data)
                })
        }
        setShowAddTag(false);
    }

    return (
        showAddTag &&
        <div className='addform'>
            <Form onFinish={handleSubmit(onSubmit)}>
                <h2>{t('添加标签')}</h2>
                <Form.Item label={t('标签')}>
                    <Controller
                        name="tag"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    {t('提交')}
                    </Button>
                    <Button style={{marginLeft:'15px'}} onClick={()=>setShowAddTag(false)}>
                    {t('取消')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddTag;