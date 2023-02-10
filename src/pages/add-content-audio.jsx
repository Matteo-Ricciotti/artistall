import InputFileComponent from '../components/atoms/input-file/input-file';
import InputTextComponent from '../components/atoms/input/inputText';
import ButtonComponent from '../components/atoms/button/button';

const AddContentAudio = () => {
    return (
        <> 
            <div className='fixed top-0 z-20 w-[100%] right-0 bg-white px-5'>
                <div className='flex items-center justify-between py-3'>
                    <p className='text-dark-grey-base font-medium text-xl tracking-wide'>Aggiungi audio</p>
                    <a>
                        <img className='w-5' src='/icons/cross.svg'/>
                    </a>
                </div>
            </div>
            <div className='flex flex-col gap-8 mt-16'>
                <div className='flex flex-col gap-6'>
                    <InputTextComponent objInputText={{ id: 'title', label: 'titolo', placeholder: 'Inserisci un titolo'}}/>
                            {/* inserire textarea*/}
                    <InputFileComponent id='file_audio' label='seleziona file' text='Massimo 2MB, .mp3'/>
                    <InputFileComponent id='file_thumbnail_audio' label='seleziona immagine di copertina' text='Massimo 2MB, .jpg,.png'/>
                    <div className='flex flex-col'>
                        <p className='text-dark-grey-base font-normal'>Genere</p>
                        <div className='inline-flex gap-[8px]'>
                            {/* inserire chips*/}
                        </div>
                    </div>
                    <div className='flex flex-col pb-[100px]'>
                        <p className='text-dark-grey-base font-normal'>Strumenti</p>
                        <div className='inline-flex gap-[8px]'>
                            {/* inserire chips*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full fixed bottom-0 right-0 z-20 bg-white px-5 py-[18px] shadow-navbar'>
                <ButtonComponent id='upload-audio' text='Carica Audio' size='medium' style='primary'/>
            </div>
        </>
    );
};

export default AddContentAudio;