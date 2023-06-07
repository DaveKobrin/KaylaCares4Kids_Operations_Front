const constantContactHTML = `
<div>
<!-- Begin Constant Contact Active Forms -->
    <script> var _ctct_m = "0ac759d4b633fc5cebfc7ef7f8ff9d85"; </script>
    <script id="signupScript" src="https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js" async defer></script>
    <div class="ctct-inline-form" data-form-id="49003991-f195-4488-8687-e07a8006dbd8"></div>
</div>
`

const ContactUs = () => {
    return (
        <section>
            <div dangerouslySetInnerHTML={{__html: constantContactHTML}} />
        </section>
    )
}

export default ContactUs;
