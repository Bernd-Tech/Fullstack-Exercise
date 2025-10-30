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

        <section className="space-y-6">
          <h3 className="text-xl font-semibold border-b border-b-(--color-light)/50 pb-2">
            Account information
          </h3>
          <div className="flex flex-col gap-6 [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
            <div className="flex flex-row justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  readOnly
                  value={formData?.user?.first_name}
                />
              </div>

              <div>
                <label>Last Name</label>
                <input type="text" readOnly value={formData?.user?.last_name} />
              </div>

              <div>
                <label>Preferred Name</label>
                <input
                  type="text"
                  readOnly
                  value={formData?.user?.preferred_name}
                />
              </div>

              <div>
                <label>Age</label>
                <input type="text" readOnly value={formData?.user?.age} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
