import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow, isThisYear } from 'date-fns';
import { vi } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}

export const getDateFormatted = (params: string) => {
    const date = new Date(params);
    const dateFormat = isThisYear(date) ? 'd MMM, HH:mm' : 'd MMM, yyyy, HH:mm';
    return format(date, dateFormat, { locale: vi });
};

export const getFormatDistanceToNow = (params: string) => {
    const date = new Date(params);
    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: vi,
    });
};

// export const getSession = () => {
//     const { data: session } = useSession();
//     return session;
// };
