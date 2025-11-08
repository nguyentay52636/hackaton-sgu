'use client'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/navigation'
import { Button } from './button'

export default function ToggerTranslation() {
    const { t } = useTranslation('common')
    const router = useRouter()

    const changeLang = (lang: string) => {
        router.push(`/${lang}`)
    }

    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold">{t('welcome')}</h1>

            <div className="mt-6 flex justify-center gap-4 border-2 border-red-500">
                <Button
                    onClick={() => changeLang('vi')}
                    className="px-4 py-2 bg-green-600 text-white rounded border-2 border-red-500"
                >
                    🇻🇳 Tiếng Việt
                </Button>
                <Button
                    onClick={() => changeLang('en')}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    🇺🇸 English
                </Button>
            </div>
        </div>
    )
}
