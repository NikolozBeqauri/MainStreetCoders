'use client'
import React, { useRef } from 'react';
import Image from "next/image";
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './UploadFile.module.scss';
import axios from 'axios';
import { ReusableIcon } from '../../ReusableIcon/ReusableIcon';
import ReusableButton from '../../ReusableButton/ReusableButton';

type FormValues = {
    playlistName: string;
    file: FileList;
};

type Props = {
    setActiveComponent: Function;
}

export const UploadFile = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();


    const onSubmit: SubmitHandler<FormValues> = (values) => {
        const data = new FormData();
        data.append("playlistName", values.playlistName)
        data.append("file", values.file[0])
        console.log(values);

        axios.post('https://project-spotify.onrender.com/playlist', data, {
            headers: {
                "Content-Type": "multipart/form-data" 
            }
        })
            .then(res => {
                console.log(res); 
                props.setActiveComponent(null)
            })
            .catch(err => {
                console.log(err);
                props.setActiveComponent(null)
            })
    };

    return (
        <div className={styles.formWrapper}>
            <div className={styles.titleWrapper}>
                <ReusableIcon imgName={"rightArrow"} />
                <h2>Create New Playlist</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Playlist Name"
                    {...register("playlistName", { required: "Playlist name is required" })}
                />
                {errors.playlistName && <span className={styles.error}>{errors.playlistName.message}</span>}

                <div className={styles.dragAndDrop}>
                    <label htmlFor="forFile">
                        <Image
                            src={`/icons/dragAndDrop.svg`}
                            alt="icon"
                            width={88}
                            height={79}
                        />
                    </label>
                    <input
                        id='forFile'
                        type="file"
                        {...register("file", { required: "Please upload a file" })}
                    />
                </div>

                {errors.file && <span className={styles.error}>{errors.file.message}</span>}

                <ReusableButton title={"Save"} />
            </form>
        </div>
    );
};

export default UploadFile;
