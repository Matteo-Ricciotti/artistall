const PATTERN = {
    username: {
        func: (value) => /^[a-zA-Z0-9]{3,15}$/.test(value),
        error: 'Il seguente campo può contenere solo lettere e numeri con un minimo di 3 e un massimo di 15'
    },
    number: {
        func: (value) => /^[0-9]{2,2}$/.test(value),
        error: 'Il seguente campo accetta solo numeri'
    },
    email: {
        func: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value),
        error: 'Formato email non valido.'
    },
    optionalEmail: {
        func: (value) => {
            if (!value) return true;

            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value);
        },
        error: 'Formato email non valido.'
    },
    password: {
        func: (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,20}$/.test(value),
        error: 'La password deve contenere almeno: una lettera maiuscola, una minuscola, un numero, un simbolo (@$!%*?&), minimo 8 e massimo 20 caratteri.'
    },
    image: {
        type: 'file',
        func: [
            ({ type }) => {
                if (!type) return true;

                return ['image/jpg', 'image/jpeg', 'image/png'].includes(type);
            },
            ({ size }) => {
                if (!size) return true;

                return size < 2000000;
            }
        ],
        error: ["L'estensione del file è errata", 'La dimensione del file è superiore ai 2MB']
    },
    video: {
        type: 'file',
        func: [
            ({ type }) => {
                if (!type) return true;
                return ['video/mp4'].includes(type);
            },
            ({ size }) => {
                if (!size) return true;

                return size < 20000000;
            }
        ],
        error: ["L'estensione del file è errata", 'La dimensione del file è superiore ai 20MB']
    },
    audio: {
        type: 'file',
        func: [
            ({ type }) => {
                if (!type) return true;

                return ['audio/mpeg', 'audio/mp3'].includes(type);
            },
            ({ size }) => {
                if (!size) return true;

                return size < 10000000;
            }
        ],
        error: ["L'estensione del file è errata", 'La dimensione del file è superiore ai 10MB']
    },
    https: {
        func: (value) => {
            if (!value) return true;
            try {
                const url = new URL(value);
                return url.protocol === 'https:';
            } catch (err) {
                return false;
            }
        },
        error: 'Il link deve contenere il prefisso https:'
    },
    phone: {
        func: (value) => {
            if (!value) return true;

            return /^[0-9]{8,10}$/.test(value);
        },
        error: 'Inserire un numero di telefono valido'
    }
};

export const setValidator = (required = false, pattern) => {
    const obj = { required: required };
    if (pattern) {
        obj.validator = PATTERN[pattern];
    }
    return obj;
};
