// src/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack'

function LanguageSwitcher() {
    const { i18n,t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                <button className='language-button' onClick={() => changeLanguage('en')}>{t('lang_button.eng')}</button>
                <button className='language-button' onClick={() => changeLanguage('ge')}>{t('lang_button.geo')}</button>
            </Stack>
        </div>
    );
}

export default LanguageSwitcher;
