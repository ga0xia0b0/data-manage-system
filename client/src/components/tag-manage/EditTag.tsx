import { useForm, Controller } from 'react-hook-form';
import { Form ,Input ,Button} from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

type TagItem = {
    key: string;
    tag: string;
}

type EditTagProps = {
    setTagData: React.Dispatch<React.SetStateAction<TagItem[]>>;
    showEditTag: boolean;
    setShowEditTag: React.Dispatch<React.SetStateAction<boolean>>;
    record: TagItem;
}

interface FormValues {
    tag: string;
}

function EditTag ({ setTagData, showEditTag, setShowEditTag, record}: EditTagProps) {
    const { t } = useTranslation();
    const { control, handleSubmit, setValue } = useForm<FormValues>();

    const onSubmit = (newData: { tag: string; }) => {
        let formatData = {
            key: record.key,
            tag: newData.tag
        }
        console.log('编辑后:',formatData);
        axios
            .put(`/api/tag/${record.key}`, formatData)
            .then((res)=>{
                setTagData(res.data);
            })
        setShowEditTag(false);
    }

    useEffect(()=>{
        setValue('tag', record.tag);
    },[record, setValue])          //根据选择编辑的数据，设置表单的默认值

    return (
        showEditTag &&
        <div className='addform'>
            <Form onFinish={handleSubmit(onSubmit)}>
                <h2>{t('编辑标签')}</h2>
                <Form.Item label={t('标签')}>
                    <Controller
                        name="tag"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field}/>}
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('提交')}
                    </Button>
                    <Button style={{marginLeft:'15px'}} onClick={()=>setShowEditTag(false)}>
                        {t('取消')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditTag;