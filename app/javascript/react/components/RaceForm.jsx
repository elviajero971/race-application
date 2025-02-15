import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RaceStatusField from './raceFields/RaceStatusField';
import RaceTitleField from './raceFields/RaceTitleField';
import RaceDateField from './raceFields/RaceDateField';
import ParticipantsField from './raceFields/ParticipantsField';
import ErrorMessage from "./ErrorMessage";

const RaceForm = ({
                      initialValues,
                      onSubmit,
                      users,
                      showStatus = true,
                      showParticipantPosition = true,
                      formError
                  }) => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: initialValues.status || 'pending',
            title: initialValues.title || '',
            start_date: initialValues.start_date || '',
            race_participants_attributes: initialValues.race_participants_attributes || [],
        },
    });

    useEffect(() => {
        setValue('status', initialValues.status || 'pending');
        setValue('title', initialValues.title || '');
        setValue('start_date', initialValues.start_date || '');
        setValue('race_participants_attributes', initialValues.race_participants_attributes || []);
    }, [initialValues, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <ErrorMessage message={formError} />
            {showStatus && <RaceStatusField register={register} error={errors.status} />}
            <RaceTitleField register={register} error={errors.title} />
            <RaceDateField register={register} error={errors.start_date} />
            <ParticipantsField
                control={control}
                register={register}
                errors={errors}
                users={users}
                showParticipantPosition={showParticipantPosition}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
                Submit race
            </button>
        </form>
    );
};

export default RaceForm;
