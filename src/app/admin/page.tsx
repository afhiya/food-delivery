import AuthUser from "@/lib/auth";

export default async function Admin(){
    const data : any = await AuthUser()
    
    return (
      <div className="flex align-middle justify-center items-center h-screen">
        <div className="py-10 px-16">
          <h1 className="text-3xl font-bold">Welcome to the Admin Panel</h1>
          <h2 className="text-center font-semibold text-xl">Admin {data?.user.name}</h2>
        </div>
      </div>
    );
}
