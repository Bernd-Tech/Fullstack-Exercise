export const ReviewPage = ({ getValues }) => {
  const formData = getValues();

  return (
    <>
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-(--color-light) mb-2">
            Summary of your entries
          </h2>
          <p className="text-(--color-light)">
            Please review your information carefully before submitting. You can
            edit any section by clicking the "Edit" button.
          </p>
        </div>

        <section className="space-y-6 w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
          <h3 className="text-xl font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Account information
          </h3>
            <div className="flex flex-col gap-4 [&>div]:flex">
              <div>
                <label className="w-1/2">Full Name:</label>
                <p className="">
                  {formData?.user?.first_name} {formData?.user?.last_name}
                </p>
              </div>
              <div>
                <label className="w-1/2">Preferred Name:</label>
                <p className="">{formData?.user?.preferred_name}</p>
              </div>
              <div>
                <label className="w-1/2">Age:</label>
                <p className="">{formData?.user?.age}</p>
              </div>
              <div className="!flex-row">
                <label className="w-1/2">Country:</label>
                <p className="">{formData?.user?.country}</p>
              </div>
              <div className="!flex-row">
                <label className="w-1/2">City:</label>
                <p className="">{formData?.user?.city}</p>
              </div>

              <div>
                <label className="w-1/2">E-Mail:</label>
                <p className="">{formData?.user?.email}</p>
              </div>
            </div>
        </section>

        <section className="space-y-6 w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
          <h3 className="text-xl font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Agreements & Consents
          </h3>
            <div className="flex flex-col gap-4 [&>div]:flex">
            <div className="flex items-baseline gap-2">
          <input
            type="checkbox"
            checked={formData?.consent?.technology_limitation || false}
            readOnly
          />
          <label htmlFor="technologyLimitation">AI limitations understood</label>
          </div>
          <div className="flex items-baseline gap-2">
          <input
            type="checkbox"
            checked={formData?.consent?.technology_limitation || false}
            readOnly
          />
          <label htmlFor="technologyLimitation">AI limitations understood</label>
          </div>
          <div className="flex items-baseline gap-2">
          <input
            type="checkbox"
            checked={formData?.consent?.technology_limitation || false}
            readOnly
          />
          <label htmlFor="technologyLimitation">AI limitations understood</label>
          </div>
          <div className="flex items-baseline gap-2">
          <input
            type="checkbox"
            checked={formData?.consent?.technology_limitation || false}
            readOnly
          />
          <label htmlFor="technologyLimitation">AI limitations understood</label>
          </div>
              <div className="">
                <label className="w-1/2">Full Name:</label>
                <p className="">
                  {formData?.user?.first_name} {formData?.user?.last_name}
                </p>
              </div>
            </div>
        </section>
      </div>
    </>
  );
};
