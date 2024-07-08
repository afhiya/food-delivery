import AuthLayouts from "@/components/layouts/Auth"
import FormLogin from "@/components/container/FormLogin"

const Login = () => {

    return(
        <>
            <AuthLayouts title="Login">
                <FormLogin/>
            </AuthLayouts>
        </>
    )
}

export default Login