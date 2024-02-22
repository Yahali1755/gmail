import { ReactNode, FC } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps {
  onSubmit: (data: Record<string, any>) => void
  children: ReactNode
  formMethods: UseFormReturn
}

const Form: FC<FormProps> = ({ onSubmit, formMethods, children }) => 
    <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {
            children
        }
        </form>
    </FormProvider>

export default Form;