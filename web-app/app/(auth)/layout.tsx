import Link from "next/link";
import Image from "next/image";


const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-200 leading-tight">AI Eye Disease</p>
            <p className="text-xs text-gray-500 font-medium">Prediction System</p>
          </div>
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            “OptiCare AI detected early signs of diabetic retinopathy in my scan that I had missed for years. The accuracy and speed of the AI is remarkable. A true life-saver.”
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- Arghya C.</cite>
              <p className="max-md:text-xs text-gray-500">
                Engineering Student
              </p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  key={star}
                  width={20}
                  height={15}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/authcover.png"
            alt="auth coverimage"
            width={1200}
            height={900}
            className="auth-dashboard-preview"
          />
        </div>
      </section>
    </main>
  );


}

export default Layout;