import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUser } from "../recoil/atom";

const Landing = () =>
{
    const navigate = useNavigate();
    const user = useRecoilValue(loginUser);
    return(<>
       <div className="p-20 bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="md:mt-40 ml-20">
          <h2 className="text-5xl font-bold mb-4">BoraPay</h2>
          <h5 className="text-xl mb-6">Payments made easy!</h5>
          {!user.loading && user.username === "" && (
            <div className="flex mt-8">
              <div className="mr-4">
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  Signup
                </button>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded-lg"
                  onClick={() => {
                    navigate('/signin');
                  }}
                >
                  Signin
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="md:mt-10">
          <img src="/paytm/landingPage.jpg" alt="Landing" className="w-full h-2/3" />
        </div>
      </div>
    </div>
    </>)
}

export default Landing;