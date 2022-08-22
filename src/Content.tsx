import { useTranslation } from "react-i18next";

const Content = () => {
    const { t } = useTranslation('rfq');

    return (
        <div>Hello {t('title')}</div>
    )
}

export default Content