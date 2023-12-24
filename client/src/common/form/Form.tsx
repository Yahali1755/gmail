import { ReactNode, FC } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps {
  onSubmit: () => void
  children: ReactNode
  formMethods: UseFormReturn
}

const Form: FC<FormProps> = ({ onSubmit, formMethods, children }) => {
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            {
                children
            }
            </form>
        </FormProvider>
    )
}

export default Form;