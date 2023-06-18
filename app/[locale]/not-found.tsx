import { useTranslations } from "next-intl"

export default function NotFound() {

  const t = useTranslations()

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <h2 className='text-white font-bold'>{t('not-found')}</h2>
    </div>
  )
}