import { useEffect, useState } from 'react';
import { Cross, Share } from '../../assets/icons';
import { Link, useLocation } from 'react-router-dom';
import { find } from '../../utility/storage';
import getUserLinks from '../../services/getUserLinks';

const PopupLink = ({ social, url }) => {
    return (
        <Link
            to={social === 'email' ? `mailto:${url}` : social === 'phone' ? `tel:${url}` : url}
            target='_blank'
        >
            <div className='flex py-4 px-1 items-center justify-between shadow-card-bot'>
                <div className='flex items-center gap-4'>
                    <img
                        crossOrigin='anonymous'
                        className='w-8 h-8 bg-cover bg-center'
                        src={`/social/${social}.png`}
                        alt=''
                    />
                    <p className='first-letter:capitalize'>{social}</p>
                </div>
                <Share />
            </div>
        </Link>
    );
};

const LinksPopup = ({ setOpen }) => {
    const [userLinks, setUserLinks] = useState([]);

    const { search } = useLocation();
    const user = new URLSearchParams(search).get('user');

    useEffect(() => {
        if (!user) return;

        const token = find('token').token;

        getUserLinks(user, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(({ data }) => {
            setUserLinks(data);
        });
    }, [user]);

    return (
        <>
            <div className='w-screen h-screen fixed left-0 top-0 z-40 backdrop-blur-[4px]'></div>
            <div className='flex flex-col gap-4 p-4 shadow-navbar rounded-t-lg bg-white fixed z-50 left-0 right-0 bottom-0'>
                <div className='flex items-center justify-between'>
                    <p className='text-lg font-semibold'>Social links</p>
                    <div onClick={() => setOpen(false)}>
                        <Cross dark />
                    </div>
                </div>
                <div className='flex flex-col'>
                    {userLinks.length &&
                        userLinks
                            .filter((l) => l.split('||')[1] !== '' && l.split('||')[1] !== '#')
                            .map((link, i) => (
                                <PopupLink
                                    key={i}
                                    social={link.split('||')[0]}
                                    url={link.split('||')[1]}
                                />
                            ))}
                </div>
            </div>
        </>
    );
};

export default LinksPopup;
