import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/atoms/Button';
import Navbar from '../components/molecules/Navbar';

const navigation = [
    {
        name: 'Tutti',
        styles: 'w-1/4 px-[10px] py-3 font-medium transition-all'
    },
    {
        name: 'Foto',
        styles: 'w-1/4 px-[10px] py-3 font-medium transition-all'
    },
    {
        name: 'Audio',
        styles: 'w-1/4 px-[10px] py-3 font-medium transition-all'
    },
    {
        name: 'Video',
        styles: 'w-1/4 px-[10px] py-3 font-medium transition-all'
    }
];

const content = [1, 2, 3, 4, 5];

const Profile = () => {
    const [currentPage, setCurrentPage] = useState('tutti');

    const navigate = useNavigate();

    const handleProfileNav = ({ target }) => {
        if (currentPage === target.id) return;

        setCurrentPage(target.id);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <>
            <div className='flex flex-col gap-6 relative bottom-5'>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-6'>
                        <div
                            className='bg-gradient-to-br from-profile-gradient-from to-profile-gradient-to to h-[208px] w-screen rounded-b-[20px]
                        relative right-5 flex justify-between items-start pt-12 px-5'
                        >
                            <img className='w-6' src='/icons/logout.svg' onClick={handleLogout} />
                            <div className='flex flex-col items-center gap-4'>
                                <img src='/logo-default.svg' />
                                <p className='text-white'>{`Nome d'arte`}</p>
                            </div>
                            <img
                                className='w-6'
                                src='/icons/edit.svg'
                                onClick={() => navigate('/profile/edit')}
                            />
                        </div>
                        <p className='text-sm font-normal'>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit. Exercitation
                            veniam consequat sunt nostrud amet.
                        </p>
                        <Button
                            text='Modifica i tuoi link'
                            style='secondary'
                            size='large'
                            callback={() => navigate('/profile/links')}
                        />
                    </div>
                    <div className='w-screen relative right-5 flex justify-between text-center shadow-profile-nav'>
                        {navigation.map((nav) => (
                            <p
                                key={nav.name}
                                id={nav.name.toLowerCase()}
                                className={`${nav.styles} ${
                                    currentPage === nav.name.toLowerCase()
                                        ? 'shadow-profile-nav-current'
                                        : ''
                                }`}
                                onClick={handleProfileNav}
                            >
                                {nav.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <p className='font-medium text-dark-grey-placeholder'>
                        <span className='font-bold text-dark-grey-base'>{content.length}</span>{' '}
                        contenuti totali
                    </p>
                    <div className='flex flex-col gap-4'>
                        {content.map((id) => (
                            <div
                                key={id}
                                className='h-[144px] rounded-[17px] bg-dark-grey-disabled'
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <Navbar />
        </>
    );
};

export default Profile;
