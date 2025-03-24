import ApplicantsList from "nglty/components/places/applicant-list";
import { auth } from "nglty/server/auth";
import { HydrateClient } from "nglty/trpc/server";

type ApplicantPageParams = {
    id: string;
  };
  
  interface ApplicantPageProps {
    params: ApplicantPageParams;
    id: string;
  }
  

const ApplicantsPage = async ({ params } : {params: Promise<ApplicantPageProps>}) => {
    const { id } = await params;

    const session = await auth();
  
    return (
      <HydrateClient>
          <main className={`${!session ? 'blur-sm' : ''}min-h-screen`}>
            <div>
  
              <ApplicantsList id={id} />
            </div>
        </main>
      </HydrateClient>
    );
};

export default ApplicantsPage;