import { ReactNode, FC } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps {
  onSubmit: () => void
  children: ReactNode
  formMethods: UseFormReturn
}

const Form: FC<FormProps> = ({ onSubmit, formMethods, children }) => {
    const handleSubmit = (event) => {
        event.preventDefault()

        formMethods.handleSubmit(onSubmit, (e) => {
            console.log('yes')
        })
    }

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
            {
                children
            }
            </form>
        </FormProvider>
    )
}

export default Form;