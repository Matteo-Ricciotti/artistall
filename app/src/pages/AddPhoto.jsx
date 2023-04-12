import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useForm from '../hooks/useForm';
import { setValidator } from '../validation/validator';

import { Cross } from '../assets/icons';

import Chip from '../components/atoms/Chip';
import Button from '../components/atoms/Button';
import Textarea from '../components/atoms/Textarea';
import InputFile from '../components/atoms/InputFile';
import InputText from '../components/atoms/InputText';

import { toast } from 'react-toastify';
import { find } from '../utility/storage';
import decode from 'jwt-decode';
import addContent from '../services/add-content';

const initGenres = [
    { name: 'Pop', active: false },
    { name: 'Hip Hop', active: false },
    { name: 'Rap', active: false },
    { name: 'Rock', active: true },
    { name: 'Classico', active: false },
    { name: 'Instrumental', active: false },
    { name: 'Chill', active: false },
    { name: 'Jazz', active: false },
    { name: 'Tecno', active: false }
];

const initInstruments = [
    { name: 'Chitarra elettrica', active: true },
    { name: 'Tastiera', active: false },
    { name: 'Chitarra Classica', active: false },
    { name: 'Batteria', active: true },
    { name: 'Sassofono', active: false },
    { name: 'Violino', active: false }
];

const AddPhoto = () => {
    const navigate = useNavigate();

    const stateSchema = {
        title: { value: '', error: '' },
        description: { value: '', error: '' },
        photo: { value: '', error: '' }
    };
    const rules = {
        title: setValidator(true),
        description: setValidator(true),
        photo: setValidator(true, 'image')
    };

    const [genres, setGenre] = useState(initGenres);
    const [instruments, setInstrument] = useState(initInstruments);

    const _token = find('token').token;
    const _decoded = decode(_token);

    const handleSubmit = (values) => {
        const data = {
            ...values,
            genres: [...genres.filter((genre) => genre.active === true)].map((genre) => {
                return genre['name'];
            }),
            instruments: [...instruments.filter((instrument) => instrument.active === true)].map(
                (instrument) => {
                    return instrument['name'];
                }
            )
        };

        toast.dismiss();

        addContent(_token, data, 'add-photo')
            .then(() => {
                toast('Contenuto aggiunto correttamente!', {
                    autoClose: 3000,
                    type: 'success'
                });
                setTimeout(() => {
                    navigate(`/profile?user=${_decoded.username}`);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                toast('Verificare che i campi siano corretti!', { type: 'error', autoClose: 3000 });
            });
    };

    const { values, errors, dirty, touch, handleOnTouch, handleOnChange, handleOnSubmit, disable } =
        useForm(stateSchema, rules, handleSubmit);

    const { title, description, photo } = values;

    const INPUT_PROPS = {
        _title: {
            id: 'title',
            label: 'titolo',
            placeholder: 'Inserisci un titolo',
            error: errors.title && (dirty.title || touch.title) && errors.title,
            val: title,
            change: handleOnChange,
            blur: handleOnTouch
        },
        _description: {
            id: 'description',
            label: 'descrizione',
            placeholder: 'Inserisci una descrizione',
            error:
                errors.description &&
                (dirty.description || touch.description) &&
                errors.description,
            val: description,
            change: handleOnChange,
            blur: handleOnTouch
        },
        _photo: {
            id: 'photo',
            label: 'seleziona file',
            text: 'Massimo 2MB, .jpg, .jpeg, .png',
            acceptRules: '.jpg, .jpeg, .png',
            error: errors.photo && (dirty.photo || touch.photo) && errors.photo,
            val: photo,
            change: handleOnChange
        }
    };

    return (
        <div className='h-screen w-[100%] flex flex-col gap-[44px]'>
            <div className='w-full fixed z-40 bg-white right-0 top-0 px-[20px] py-[12px] flex items-center justify-between'>
                <p className='text-dark-grey-base font-medium text-xl tracking-wide py-2'>
                    Aggiungi foto
                </p>
                <a className='w-7 h-7' onClick={() => navigate('/profile')}>
                    <Cross dark={true} />
                </a>
            </div>
            <div className='flex flex-col gap-6 pb-32 pt-[48px]'>
                <div className='flex flex-col gap-[24px]'>
                    <InputText inputProps={INPUT_PROPS._title} />
                    <Textarea textareaProps={INPUT_PROPS._description} />
                    <InputFile inputFileProps={INPUT_PROPS._photo} />
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-dark-grey-base font-medium text-sm'>Genere</p>
                        <div className='flex flex-wrap gap-2'>
                            {genres.map(({ name, active }, i) => (
                                <Chip
                                    key={i}
                                    text={name}
                                    active={active}
                                    callback={() =>
                                        setGenre((prev) => {
                                            return [
                                                ...prev.slice(0, i),
                                                {
                                                    ...prev[i],
                                                    active: ![...prev][i].active
                                                },
                                                ...prev.slice(i + 1)
                                            ];
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-dark-grey-base font-medium text-sm'>Strumenti</p>
                        <div className='flex flex-wrap gap-2'>
                            {instruments.map(({ name, active }, i) => (
                                <Chip
                                    key={i}
                                    text={name}
                                    active={active}
                                    callback={() =>
                                        setInstrument((prev) => {
                                            return [
                                                ...prev.slice(0, i),
                                                {
                                                    ...prev[i],
                                                    active: ![...prev][i].active
                                                },
                                                ...prev.slice(i + 1)
                                            ];
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full fixed bottom-0 right-0 shadow-navbar py-[18px] px-5 bg-white  z-10 '>
                <Button
                    id='upload-photo'
                    style='primary'
                    text='Carica foto'
                    size='medium'
                    disabled={disable}
                    callback={handleOnSubmit}
                />
            </div>
        </div>
    );
};

export default AddPhoto;
